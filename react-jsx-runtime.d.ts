declare module 'react/jsx-runtime' {
  import * as React from 'react';
  
  export namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
    interface Element extends React.JSX.Element {}
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
  }
  
  export function jsx(
    type: React.ElementType,
    props: any,
    key?: React.Key
  ): React.ReactElement;
  
  export function jsxs(
    type: React.ElementType,
    props: any,
    key?: React.Key
  ): React.ReactElement;
  
  export const Fragment: React.ExoticComponent<{ children?: React.ReactNode }>;
}

