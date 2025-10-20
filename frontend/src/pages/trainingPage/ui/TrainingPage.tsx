import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllCards} from "../../../entities";
import {selectAllModuleCards} from "../../../entities/moduleCard/model/selectModuleCards";
import {Match, Memorize, Repetition, Test} from "../../../features";

// /training?type=test&group=5&modules=12,14,18

export const TrainingPage = () => {
    const [params] = useSearchParams()

    const type = params.get('type')
    const groupId = params.get('group')
    const moduleIds = params.get('modules')?.split(',')

    // запрос на сервер за карточками
    const termCards = useSelector(selectAllCards)
    const cardModules = useSelector(selectAllModuleCards)

    // moduleIds.forEach(id => {
    //
    // })

    //


    useEffect(() => {
        // params.forEach(par =>
        //     console.log(par)
        // )
        console.log(moduleIds)
    })

    switch (type) {
        case 'repetition':
            return <Repetition/>;
        case 'memorize':
            return <Memorize/>;
        case 'test':
            return <Test/>;
        case 'match':
            return <Match/>;
        default:
            return <div> нет TrainingPage </div>
    }


};