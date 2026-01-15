import {Theme} from "../../model/theme/types";

export const applyTheme = (theme: Theme) => {
    document.documentElement.dataset.theme = theme;
};
