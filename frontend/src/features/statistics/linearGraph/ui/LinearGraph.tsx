import React, {useEffect, useMemo} from 'react';
import styles from './LinearGraph.module.scss'
import {useSelector} from "react-redux";
import {selectLinearGraph} from "../model/selectors";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {RootState} from "../../../../app/store";

// переделать
export const LinearGraph = () => {
    const graph = useSelector((state: RootState) => state.linearGraph.progress)

    const data = useMemo(() => {
        return graph.map((item) => ({
            ...item,
            totalCards:
                item.level0 +
                item.level1 +
                item.level2 +
                item.level3,
        }))
    }, [graph])

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (<div
            className={styles.container}>
            <div className={styles.linearGraph}>
                <LineChart
                    style={{
                        width: '100%',
                        aspectRatio: 1.618,
                        maxHeight: '350px',
                        maxWidth: '100%',
                    }}
                    responsive
                    data={data}
                    margin={{top: 5, right: 20, bottom: 5, left: 0}}
                >
                    <CartesianGrid stroke="#aaa" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="totalCards" stroke="black" strokeWidth={2} name="Всего карт"/>
                    <Line type="monotone" dataKey="level0" stroke="gray" strokeWidth={3} name="Карты с уровнем 0"/>
                    <Line type="monotone" dataKey="level1" stroke="green" strokeWidth={3} name="Карты с уровнем 1"/>
                    <Line type="monotone" dataKey="level2" stroke="orange " strokeWidth={3} name="Карты с уровнем 2"/>
                    <Line type="monotone" dataKey="level3" stroke="red" strokeWidth={3} name="Карты с уровнем 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis width="auto" label={{value: 'карты', position: 'insideLeft', angle: -90}}/>
                    <Legend align="right"/>
                    <Tooltip/>
                </LineChart>
            </div>
            {/*<div> wdwdwd dwdwdwd</div>*/}
        </div>
    );
};