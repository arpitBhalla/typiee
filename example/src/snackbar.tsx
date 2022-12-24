import { makeStyles } from "@rneui/themed/dist/config/makeStyles";
import color from "color";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { SnackBarContext } from "./SnackbarContext";
import { SnackbarProviderProps, ShowParams, Show, Snackbar } from "./types";

export const SnackProvider = ({
  children,
  manualHide,
  autoHideDuration = 5000,
  origin = {
    horizontal: "left",
    vertical: "bottom",
  },
  dense = false,
  maxSnack = 3,
  variant = "default",
}: React.PropsWithChildren<SnackbarProviderProps>) => {
  const [state, setState] = useState<Record<number, ShowParams>>({});
  const idCounter = useRef(0);
  const themedStyles = useStyles();

  const hide: Snackbar["hide"] = (id) => {
    setState((a) => {
      const prevState = { ...a };
      if (prevState[id]) delete prevState[id];
      return prevState;
    });
  };
  // @ts-ignore
  const show: Show = (title, param2, param3) => {
    const id = idCounter.current++;
    const timeoutSecs = typeof param2 === "number" ? param2 : autoHideDuration;
    const actions = (typeof param2 === "object" ? param2 : param3)?.map(
      (action) => (typeof action === "function" ? action(id) : action)
    );
    setState((prev) => ({
      ...prev,
      [id]: {
        title,
        actions,
      },
    }));
    if (!manualHide) setTimeout(() => hide(id), timeoutSecs);
    return id;
  };

  return (
    <SnackBarContext.Provider value={{ show, hide }}>
      {children}
      <View style={styles.container} pointerEvents="none">
        {Object.entries(state).map(([id, props]) => (
          <SnackbarItem
            themedStyles={themedStyles}
            id={Number(id)}
            key={id}
            {...props}
          />
        ))}
      </View>
      <Text>{JSON.stringify({ state })}</Text>
    </SnackBarContext.Provider>
  );
};

export const SnackbarItem = ({
  title,
  actions,
  themedStyles,
}: ShowParams & { id: number; themedStyles: any }) => {
  const ref = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(ref.current, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: ref.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
        themedStyles.snackbar,
      ]}
      pointerEvents="box-only"
    >
      <View style={[styles.content, themedStyles.content]}>
        <Text>{title}</Text>
      </View>
      <View style={[styles.actionContainer, themedStyles.actions]}>
        {actions?.map(({ icon, onClick }) => (
          <View style={styles.action} pointerEvents="box-none">
            <TouchableOpacity onPress={onClick}>{icon}</TouchableOpacity>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: Dimensions.get('window').height - 100,
    backgroundColor: "#0f02",
    width: "100%",
    paddingHorizontal: 20,
  },
  snackbar: {
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
  },
  content: {},
  actionContainer: {
    flexDirection: "row",
  },
  action: {
    // borderLeftColor: '#f005',
    // borderLeftWidth: 1,
    // paddingLeft: 10,
  },
});
const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: color(theme.colors.primary).lighten(0.6).toString(),
    borderColor: color(theme.colors.primary).lighten(0.2).toString(),
    color: theme.colors.primary,
  },
}));
