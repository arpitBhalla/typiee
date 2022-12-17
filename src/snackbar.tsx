import { createContext, useContext, useState, useMemo, useRef } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { useTheme, makeStyles, Theme } from '@rneui/themed';
import color from 'color';

type SnackBarActon = {
  onClick: () => void;
  icon: string;
};
type SnackBarActons = (SnackBarActon | ((id: number) => SnackBarActon))[]
type Show = {
  // (title: string): number;
  // (title: string, timeout: number): number;
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

export const SnackProvider = ({ children }: any) => {
  const [state, setState] = useState<Record<number, ShowParams>>({});
  const idCounter = useRef(0);

  const hide: ContextType['hide'] = (id) => {
    setState((a) => {
      const prevState = { ...a };
      console.log(id, prevState);
      if (prevState[id]) delete prevState[id];
      return prevState;
    });
  };

  const show: Show = (title, param2, param3) => {
    const id = idCounter.current++;
    const timeout = typeof param2 === 'number' ? param2 : 5000;
    const actions = (typeof param2 === 'object' ? param2 : param3)?.map(
      (action) => (typeof action === 'function' ? action(id) : action)
    );
    setState((prev) => ({
      ...prev,
      [id]: {
        title,
        actions,
        timeout,
      },
    }));
    setTimeout(() => hide(id), timeout);
    return id;
  };

  return (
    <SnackBarContext.Provider value={{ show, hide }}>
      {children}
      <View style={styless.container} pointerEvents="none">
        {Object.entries([]).map(([id, props]) => (
          <SnackBar key={id} id={id as unknown as number} {...props} />
        ))}
      </View>
      {JSON.stringify(state)}
    </SnackBarContext.Provider>
  );
};

export const SnackBar = ({
  title,
  id,
  actions,
}: ShowParams & { id: number }) => {
  const styles = useStyles();
  return (
    <View style={styles.snackbar} pointerEvents="box-only">
      <View style={styles.content}>{title}</View>
      {JSON.stringify(actions)}
    </View>
  );
};

/**
 * {actions?.map((action) => {
        // const { icon = 'X', onClick } =
        //   typeof action === 'function' ? action(id) : action;
        return <TouchableHighlight style={styles.action}>x</TouchableHighlight>;
      })}
 */

const styless = StyleSheet.create({
  container: {
    position: 'absolute',
    // top: Dimensions.get('window').height - 100,
    // backgroundColor: '#0f02',
    width: '100%',
    paddingHorizontal: 20,
  },
});

const useStyles = makeStyles((theme: { colors: { primary: any } }) => ({
  snackbar: {
    backgroundColor: color(theme.colors.primary).lighten(0.6),
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: theme.colors.primary,
    borderRadius: 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  content: {},
  action: {
    borderLeftColor: '#f005',
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
}));
