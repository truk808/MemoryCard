import React from 'react';
import {Section} from "../../../widgets";
import {Button, CardList, Tabs} from "../../../shared";
import {TrainModeList} from "../../../features";
import {ModuleCard, TermCard, useModuleSelector, useTermCardSelector} from "../../../entities";

export const GroupPage = () => {
    const {modules, modulesDispatch} = useModuleSelector()

    return (
        <div>
            <Section
                title={'Unity'}
                description={'Unity — это кроссплатформенная среда разработки (игровой движок), позволяющая' +
                    ' создавать 2D- и 3D-игры, приложения, симуляторы и другой интерактивный контент для более ' +
                    'чем 25 платформ, включая ПК, мобильные устройства, игровые консоли, VR/AR и интернет.'}
                features={[
                    <Button color={'blue'}> Редактировать </Button>,
                    <Button color={'red'}> Удалить </Button>,
                ]}
            >
                <Tabs titles={['Модули', 'статистика', 'что']}>
                    {[
                        <>
                            <TrainModeList/>
                            <CardList
                                items={modules}
                                renderItem={module => <ModuleCard module={module}/>}
                            />
                        </>,
                        <>
                            <div>Здесь пусто!</div>
                        </>,
                        <>
                            <div>Здесь что!</div>
                        </>
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};
