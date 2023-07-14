declare module '*.module.less' {
  const styles: {
    [key in string]: string;
  };
  export default styles;
}
