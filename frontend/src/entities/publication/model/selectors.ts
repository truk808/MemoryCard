import {RootState} from "../../../app/store";
import {getItemById, getItems} from "../../../shared/lib/selectors";

export const selectPublications = (state: RootState) => state.publication.publications;

export const selectAllPublications = getItems(selectPublications);
export const selectPublicationById = (id: number) => getItemById(selectPublications, id);
// export const selectPublicationByUserId = (id: number) => getItemById(selectPublications, id);