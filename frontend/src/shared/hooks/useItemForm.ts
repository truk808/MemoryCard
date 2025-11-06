import React from "react";


export function useItemForm<T extends Record<string, any>>(initialValue: T) {
    const [form, setForm] = React.useState<T>(initialValue);

    function handleChange<K extends keyof T>(key: K, value: T[K]) {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    function resetForm() {
        setForm(initialValue);
    }

    return {form, handleChange, resetForm};
};

