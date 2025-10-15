import {Section} from "../../../widgets";
import {Button, CardList, Tabs} from "../../../shared";
import {ModuleManager, TrainModeList} from "../../../features";
import {selectCardsByGroupId, selectModuleById, TermCard} from "../../../entities";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {getRelatedIdsByEntityId} from "../../../shared/lib/getItemIdsByEntityId";
import React from "react";


export const ModulePage = () => {
    const [isOpenModuleManager, setIsOpenModuleManager] = React.useState(false);

    const moduleId = +useLocation().pathname.split("/")[2];
    const module = useSelector(selectModuleById(moduleId))[0];

    const moduleCard = useSelector((state: RootState) => state.moduleCard.moduleCards);
    const cardIds = getRelatedIdsByEntityId(moduleId, moduleCard, 'module_id', 'card_id');
    const termCards = useSelector(selectCardsByGroupId(cardIds))

    return (
        <div>
            <ModuleManager
                closeModal={() => setIsOpenModuleManager(false)}
                isOpen={isOpenModuleManager}
                mode={'edit'}
                item={{
                    name: module.name,
                    selectedCardIds: cardIds
                }}
            />
            <Section
                title={module.name}
                features={[
                    <Button color={'blue'} onClick={() => setIsOpenModuleManager(true)}> Редактировать </Button>,
                    <Button color={'red'}> Удалить </Button>
                ]}
            >
                <Tabs titles={['Модули', 'Статистика', 'tvft']}>
                    {[
                        <>
                            <TrainModeList/>
                            <CardList
                                items={termCards}
                                renderItem={card => <TermCard card={card}/>}
                            />
                        </>,
                        <>

                        </>,
                        <>

                        </>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};