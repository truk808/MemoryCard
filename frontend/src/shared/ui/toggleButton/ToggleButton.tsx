import React from "react";
import styles from "./ToggleButton.module.scss"

interface ToggleButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
                                                              active,
                                                              onClick,
                                                              children,
                                                          }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.button} ${active ? styles.active : ""}`}
        >
            {children}
        </button>
    );
};
