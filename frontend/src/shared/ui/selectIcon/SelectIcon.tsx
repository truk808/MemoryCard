import React, { FC, useMemo, useState } from "react";
import * as Icons from "@heroicons/react/24/outline";
import styles from "./SelectIcon..module.scss";

interface SelectIconProps {
    selectedItems?: string;
    onChange: (selected: string) => void;
}

const ROWS = 3;
const COLUMNS = 10;

export const SelectIcon: FC<SelectIconProps> = ({
                                                    selectedItems,
                                                    onChange,
                                                }) => {
    const icons = useMemo(() => Object.entries(Icons), []);
    const [page, setPage] = useState(0);

    const pageSize = ROWS * COLUMNS;
    const startIndex = page * pageSize;
    const visibleIcons = icons.slice(startIndex, startIndex + pageSize);

    return (
        <>
            <div className={styles.iconContainer}>
                {visibleIcons.map(([name, Icon]) => (
                    <div
                        key={name}
                        onClick={() => onChange(name)}
                        className={[
                            styles.icon,
                            name === selectedItems ? styles.active : "",
                        ].join(" ")}
                    >
                        <Icon />
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
                <button
                    onClick={() => setPage(p => p - 1)}
                    disabled={page === 0}
                >
                    ←
                </button>

                <span>{page + 1}</span>

                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={(page + 1) * pageSize >= icons.length}
                >
                    →
                </button>
            </div>
        </>
    );
};
