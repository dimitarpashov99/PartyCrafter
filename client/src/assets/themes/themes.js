import Styles from './styles';

const GetDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? Styles.light : Styles.dark),
  },
});

export default GetDesignTokens;