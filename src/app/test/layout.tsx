


import styles from "./layout.module.css"

export default function RootLayout({children,test1}: Readonly<{children: React.ReactNode,test1:React.ReactNode}>) {
  return (
    <>
    <div>{children}</div>
    <div>{test1}</div>
    </>
  );
}
