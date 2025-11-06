// /features/training/ui/ModalResult/ModalResult.tsx
import React, { FC } from "react";
import { Button, Modal } from "../../../../shared";
import {NavLink} from "react-router-dom";

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
            <div className="p-4 text-center space-y-2">
                <h3 className="text-xl font-semibold mb-2">Результаты тренировки</h3>
                <h5>Тип: {type}</h5>
                <h5>Карточек: {cardsCount}</h5>
                <h5>Ошибок: {wrongCount}</h5>
                <h5>Время: {duration} сек</h5>
                <h5>Дата: {date}</h5>

                <div className="mt-4">
                    <Button onClick={close} color="blue">
                        <NavLink to={`/`}>
                            Далее
                        </NavLink>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
