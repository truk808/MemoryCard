import {Section} from "../../../widgets";
import {Button, CardList, Tabs} from "../../../shared";
import {TrainModeList} from "../../../features";
import {TermCard, useTermCardSelector} from "../../../entities";


export const ModulePage = () => {
    const {termCards, termCardsDispatch} = useTermCardSelector()

    return (
        <div>
            <Section
                title={'ООП'}
                features={[
                    <Button color={'blue'}> Редактировать </Button>,
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