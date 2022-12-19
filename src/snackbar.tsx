import { makeStyles } from "@rneui/themed";
import color from "color";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

type SnackBarActon = {
  onClick: () => void;
  icon: string;
};
type SnackBarActons = (SnackBarActon | ((id: number) => SnackBarActon))[];
type Show = {
  (title: string, actions?: SnackBarActons): number;
  (title: string, timeout?: number, actions?: SnackBarActons): number;
};

type ContextType = {
  show: Show;
  hide: (id: number) => void;
};

const SnackBarContext = createContext<ContextType>({
  show: () => -1,
  hide: () => {},
});

export const useSnackBar = () => useContext(SnackBarContext);

type ShowParams = {
  timeout?: number;
  title: string;
  actions?: SnackBarActon[];
};

export const SnackProvider = ({
  children,
  manualHide,
  timeout = 5000,
}: {
  children: React.ReactNode;
  manualHide?: boolean;
  timeout?: number;
}) => {
  const [state, setState] = useState<Record<number, ShowParams>>({});
  const idCounter = useRef(0);
  const styles = useStyles();

  const hide: ContextType["hide"] = (id) => {
    setState((a) => {
      const prevState = { ...a };
      if (prevState[id]) delete prevState[id];
      return prevState;
    });
  };
  // @ts-ignore
  const show: Show = (title, param2, param3) => {
    const id = idCounter.current++;
    const timeoutSecs = typeof param2 === "number" ? param2 : timeout;
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
          <SnackBar styles={styles} id={Number(id)} key={id} {...props} />
        ))}
      </View>
      {JSON.stringify({ state })}
    </SnackBarContext.Provider>
  );
};

export const SnackBar = ({
  title,
  actions,
  styles,
}: ShowParams & { id: number; styles: any }) => {
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
        styles.snackbar,
      ]}
      pointerEvents="box-only"
    >
      <View style={styles.content}>{title}</View>
      <View style={styles.actions}>
        {actions?.map(({ icon, onClick }) => (
          <View style={styles.action} pointerEvents="box-none">
            <TouchableOpacity onPress={onClick}>{icon}</TouchableOpacity>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    // position: 'absolute',
    // top: Dimensions.get('window').height - 100,
    // backgroundColor: '#0f02',
    width: "100%",
    paddingHorizontal: 20,
  },
  snackbar: {
    backgroundColor: color(theme.colors.primary).lighten(0.6).toString(),
    s: console.log(Math.random()),
    borderWidth: 1,
    borderColor: color(theme.colors.primary).lighten(0.2).toString(),
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: theme.colors.primary,
    borderRadius: 4,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  content: {},
  action: {
    // borderLeftColor: '#f005',
    // borderLeftWidth: 1,
    // paddingLeft: 10,
  },
  actions: {
    flexDirection: "row",
  },
}));
