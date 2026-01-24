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
                <h3 className={`heading-xl ${styles.title}`}>Результаты тренировки</h3>

                <div className={`text-base ${styles.list}`}>
                    <h5><strong>Тип:</strong> {type}</h5>
                    <h5><strong>Карточек:</strong> {cardsCount}</h5>
                    <h5><strong>Ошибок:</strong> {wrongCount}</h5>
                    <h5><strong>Время:</strong> {duration} сек</h5>
                    <h5><strong>Дата:</strong> {date}</h5>
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
