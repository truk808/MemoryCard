import {useDispatch, useSelector} from "react-redux";
import {selectAllPublications} from "../../../entities/publication/model/selectors";
import {useEffect, useMemo} from "react";
import {createPublication, getAllPublications, importPublication} from "../../../shared/api/communityApi";
import {setPublications} from "../../../entities/publication/model/slice";
import {RootState} from "../../../app/store";
import {addGroups, setGroups} from "../../../entities/group/model/slice";

export function useSocietySection() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const publications = useSelector(selectAllPublications);

    const userPublications = useMemo(() => {
        // @ts-ignore
        return publications.filter(pub => user.user.id === pub.authorUserId);
    }, [publications]);

    function onDownload(id: number) {
        console.log(id)
        importPublication(id)
    }

    useEffect(() => {
        console.log(publications)
    }, [publications]);

    useEffect(() => {
        getAllPublications().then(data => {
            dispatch(setPublications(data))
        })
    }, [])
    return {
        publications,
        userPublications,
        onDownload,
    }
}