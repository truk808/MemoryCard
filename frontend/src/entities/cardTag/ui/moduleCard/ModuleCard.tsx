// import React, { FC } from "react";
// import styles from "./Module.module.scss";
// import { NavLink } from "react-router-dom";
// import * as Icons from "@heroicons/react/24/outline";
// import {Module} from "../../../../shared/types";
// import {MODULE_ROUTE} from "../../../../shared/routes/const";
//
// interface ModuleCardProps {
//     module: Module;
// }
//
// export const ModuleCard: FC<ModuleCardProps> = ({ module }) => {
//     const Icon = module.icon
//         ? (Icons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[module.icon]
//         : null;
//
//     return (
//         <NavLink to={`${MODULE_ROUTE}/${module.id}`}>
//             <div className={styles.card}>
//                 <div className={styles.icon}>
//                     {Icon ? <Icon /> : null}
//                 </div>
//
//                 <div className={styles.cardInfo}>
//                     <h2 className={styles.title}>{module.name}</h2>
//                     <p className={styles.text}>карт много</p>
//                 </div>
//             </div>
//         </NavLink>
//     );
// };

//переделать
export const a=3