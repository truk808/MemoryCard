import React, { FC } from "react";
import { Button, Modal } from "../../../../shared/ui";
import { NavLink } from "react-router-dom";
import styles from "./ModalResult.module.scss";

interface ModalResultProps {
    isOpen: boolean;
    close: () => void;
    type: string | null;
    cardsCount: number;
    wrongCount: number;
    duration: number;
    date: string;
}

export const ModalResult: FC<ModalResultProps> = ({
                                                      isOpen,
                                                      close,
                                                      type,
                                                      cardsCount,
                                                      wrongCount,
                                                      duration,
                                                      date,
                                                  }) => {
    return (
        <Modal closeModal={close} isOpen={isOpen}>
            <div className={styles.container}>
                <h3 className={styles.title}>Результаты тренировки</h3>

                <div className={styles.list}>
                    <h5>Тип: {type}</h5>
                    <h5>Карточек: {cardsCount}</h5>
                    <h5>Ошибок: {wrongCount}</h5>
                    <h5>Время: {duration} сек</h5>
                    <h5>Дата: {date}</h5>
                </div>

                <div className={styles.footer}>
                    <Button onClick={close} color="blue">
                        <NavLink to="/">Далее</NavLink>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
