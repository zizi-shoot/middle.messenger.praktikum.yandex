declare module '*.module.css' {
  const styles: { [className: string]: string };
  export = styles;
}

type Primitive = string | number | boolean;
