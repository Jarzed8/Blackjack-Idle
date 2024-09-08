import React, { useEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../utils/constants";
import { HouseHand } from "./HouseHand";
import { PlayerHand } from "./PlayerHand";
import { ChangeHouseTurn, DealHouseCards, DealPlayerCards, GetPlayerScore, GetWinner, HOUSETURN, HousePlay, PlayerHit, StartGame } from "../utils/GameMode";
import { WinnerButtons } from "./WinnerButtons";
import { Hand, WinStates } from "../utils/types";
import { OnWinContext, PlayerChipsContext, WinLossChipsContext } from "../../App";

type GameView = {
  setGameOver: any;
};

StartGame();

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "set_Player_Hand": {
      return {
        playerHand: action.setPlayerHand,
        houseHand: state.houseHand,
        houseTurn: state.houseTurn,
        gameWinner: state.gameWinner,
      };
    }
    case "set_House_Hand": {
      return {
        playerHand: state.playerHand,
        houseHand: action.setHouseHand,
        houseTurn: state.houseTurn,
        gameWinner: state.gameWinner,
      };
    }
    case "set_House_Turn": {
      return {
        playerHand: state.playerHand,
        houseHand: state.houseHand,
        houseTurn: action.setHouseTurn,
        gameWinner: state.gameWinner,
      };
    }
    case "set_Game_Winner": {
      return {
        playerHand: state.playerHand,
        houseHand: state.houseHand,
        houseTurn: state.houseTurn,
        gameWinner: action.setGameWinner,
      };
    }
  }
  console.warn("Invalid reducer action");
};

const initialState: {
  playerHand: Hand;
  houseHand: Hand;
  houseTurn: boolean;
  gameWinner: WinStates | "";
} = {
  playerHand: DealPlayerCards(),
  houseHand: DealHouseCards(),
  houseTurn: HOUSETURN,
  gameWinner: "",
};

export const GameView = (props: GameView) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const playerChips = React.useContext(PlayerChipsContext);
  const winLossChips = React.useContext(WinLossChipsContext);
  const OnWin = React.useContext(OnWinContext);
  const [chips, setChips] = React.useState(playerChips.playerChips);

  useEffect(() => {
    setChips(playerChips.playerChips);
  }, [playerChips.playerChips]);

  const RestartGame = () => {
    StartGame();
    props.setGameOver(false);
    dispatch({ type: "set_Player_Hand", setPlayerHand: DealPlayerCards() });
    dispatch({ type: "set_House_Hand", setHouseHand: DealHouseCards() });
    dispatch({ type: "set_Game_Winner", setGameWinner: "" });
    dispatch({ type: "set_House_Turn", setHouseTurn: HOUSETURN });
  };

  const PlayerHitDeal = () => {
    if (state?.houseTurn === false) {
      dispatch({ type: "set_Player_Hand", setPlayerHand: PlayerHit() });
      if ((GetPlayerScore()[0] > 21 && GetPlayerScore()[1] === 0) || (GetPlayerScore()[0] > 21 && GetPlayerScore()[1] > 21)) {
        PlayerStandDeal();
      }
      // 5 card charlie?
    }
  };

  const PlayerStandDeal = () => {
    if (state?.houseTurn === false) {
      ChangeHouseTurn(true);
      dispatch({ type: "set_House_Turn", setHouseTurn: HOUSETURN });
      // setHouseTurn(HOUSETURN);
      HousePlays();
    }
  };

  const HousePlays = async () => {
    let b = await HousePlay();
    dispatch({ type: "set_House_Hand", setHouseHand: DealHouseCards() });
    while (b) {
      // House plays untill HousePlay() returns false(Stands)
      b = await HousePlay();
      dispatch({ type: "set_House_Hand", setHouseHand: DealHouseCards() });
    }
    // House Stand get winner
    AwardWinner();
  };

  const AwardWinner = () => {
    const winner = GetWinner();
    // Player Wins
    if (winner === "playerWins") {
      // Award gold chips
      const rand = Math.random();
      if (rand < OnWin.goldChipChance) playerChips.setPlayerGoldChips(playerChips.playerGoldChips + 1);
      // console.log(rand, " / ", OnWin.goldChipChance);
      // Award chips
      playerChips.setPlayerChips(chips + winLossChips.winChips * winLossChips.xMulti);
      // Award xp
      OnWin.setCurrXp(OnWin.currXp + OnWin.xpGain);
    }
    // House Wins
    else if (winner === "houseWins") {
      playerChips.setPlayerChips(chips - winLossChips.lossChips);
    }
    // Push
    // Give push chips if they have the upgrade
    else if (winLossChips.pushChips > 0) {
      playerChips.setPlayerChips(chips + winLossChips.pushChips * winLossChips.xMulti);
    }
    dispatch({ type: "set_Game_Winner", setGameWinner: winner });
    props.setGameOver(true);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={{ marginTop: 8 }}>
          <HouseHand hand={state?.houseHand} houseTurn={state?.houseTurn} />
        </View>
        <View style={{ alignItems: "center" }}>{!(state?.gameWinner === "") && <WinnerButtons onPress={() => RestartGame()} winner={state?.gameWinner} />}</View>
        <View>
          <PlayerHand hand={state?.playerHand} playerHit={() => PlayerHitDeal()} playerStand={() => PlayerStandDeal()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.tableDarkGreen,
    padding: 12,
    paddingTop: 0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.tableGreen,
    justifyContent: "space-between",
    padding: 6,
    borderRadius: 10,
  },
});
