import { IFiles } from "./form.interface";

const takeAndProcessData = (data: unknown, file:IFiles): unknown => {
    if (!file.supportingDocument) {
        throw new Error('Supporting document is required');
    }
    file.supportingDocument.map((singleFile) => {
        console.log(singleFile.path);
    });
    
    // Process data
    

    return data;
};

export const formServices = {
    takeAndProcessData
};