declare module '*.module.scss' {
  const styles: {
    [key in string]: string;
  };
  export default styles;
}
