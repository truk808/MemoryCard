import React from 'react';
import {Section} from "../../../widgets";
import {Button} from "../../../shared";
import {TrainModeList} from "../../../features";


export const GroupPage = () => {
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
                <TrainModeList />
            </Section>
        </div>
    );
};
