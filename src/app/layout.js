import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Greg's Weather",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({children}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}