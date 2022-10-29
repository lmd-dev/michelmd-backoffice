import { createTheme, Theme } from "@mui/material";

function updateMaterialTheme(): Theme
{
    const theme = createTheme({
        palette: {
            primary: {
                main: "rgb(108 88 246)",
                contrastText: "#fff"
            }
        }
    });

    return theme
}

export const theme = updateMaterialTheme();