import React, { useState } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownItem {
    id: number;
    label: string;
}

interface DropdownProps<T extends DropdownItem> {
    items: T[];
    selectedIds: number[];
    onChange: (ids: number[]) => void;
    placeholder?: string;
}

export const Dropdown = <T extends DropdownItem>({
                                                                items,
                                                                selectedIds,
                                                                onChange,
                                                                placeholder = "Выберите теги",
                                                            }: DropdownProps<T>) => {
    const [open, setOpen] = useState(false);

    const toggle = (id: number) => {
        onChange(
            selectedIds.includes(id)
                ? selectedIds.filter(x => x !== id)
                : [...selectedIds, id]
        );
    };

    const selectedLabels = items
        .filter(item => selectedIds.includes(item.id))
        .map(item => item.label);

    return (
        <div className={styles.root}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(prev => !prev)}
            >
                <span className={styles.value}>
                    {selectedLabels.length > 0
                        ? selectedLabels.join(", ")
                        : placeholder}
                </span>
                <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className={styles.menu}>
                    {items.map(item => (
                        <label key={item.id} className={styles.item}>
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggle(item.id)}
                            />
                            <span>{item.label}</span>
                        </label>
                    ))}

                    {selectedIds.length > 0 && (
                        <button
                            type="button"
                            className={styles.reset}
                            onClick={() => onChange([])}
                        >
                            Сбросить
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
