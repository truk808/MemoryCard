import React from 'react';
import styles from './LinearGraph.module.scss'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip} from 'recharts';

const data = [
    {
        name: '01', total: 0, level0: 0, level1: 0, level2: 0, level3: 0,
    },
    {
        name: '02', total: 10, level0: 6, level1: 1, level2: 2, level3: 1,
    },
    {
        name: '03', total: 25, level0: 15, level1: 4, level2: 4, level3: 2,
    },
    {
        name: '04', total: 25, level0: 5, level1: 10, level2: 6, level3: 4,
    },
    {
        name: '05', total: 40, level0: 10, level1: 10, level2: 20, level3: 10,
    },
    {
        name: '06', total: 60, level0: 15, level1: 20, level2: 10, level3: 10,
    },

];

export const LinearGraph = () => {
    return (
        <div className={styles.container}>
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
                    // margin={{top: 5, right: 20, bottom: 5, left: 0}}
                >
                    <CartesianGrid stroke="#aaa" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="total" stroke="black" strokeWidth={2} name="Всего карт"/>
                    <Line type="monotone" dataKey="level0" stroke="gray" strokeWidth={3} name="Карты с уровнем 0"/>
                    <Line type="monotone" dataKey="level1" stroke="green" strokeWidth={3} name="Карты с уровнем 1"/>
                    <Line type="monotone" dataKey="level2" stroke="orange " strokeWidth={3} name="Карты с уровнем 2"/>
                    <Line type="monotone" dataKey="level3" stroke="red" strokeWidth={3} name="Карты с уровнем 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis width="auto" label={{value: 'карты', position: 'insideLeft', angle: -90}}/>
                    <Legend align="right"/>
                    <Tooltip/>
                </LineChart>
            </div>
{/*            <div className={styles.info}>*/}
{/*f*/}
{/*            </div>*/}
        </div>

    );
};