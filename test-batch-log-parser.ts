import { parseBatchLog } from './src/app/modules/Response/batchLogParse';
import { parseReceptionLog } from './src/app/modules/Response/receptionLogParse';
import { parseDecisionLog } from './src/app/modules/Response/decisionLogParse';

async function testBatchLogParser() {
    try {
        parseBatchLog();
        parseReceptionLog();
        parseDecisionLog();
    } catch (error) {
        console.error('❌ Error testing batch log parser:', error);
    }
}

export { testBatchLogParser };
