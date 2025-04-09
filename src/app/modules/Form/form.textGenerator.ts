import { generateRecordSent } from "../../utils/utilityFunction";

const formTextGenerator = (data: any) => {

    const RECORD_SENT = generateRecordSent()
    const SUBMITTER_ID = "0004";
    const HEADER_RECORD = `H,${SUBMITTER_ID},`

    return "0";
}

export { formTextGenerator };
