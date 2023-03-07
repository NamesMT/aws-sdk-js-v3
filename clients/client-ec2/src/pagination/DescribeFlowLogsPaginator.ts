// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  DescribeFlowLogsCommand,
  DescribeFlowLogsCommandInput,
  DescribeFlowLogsCommandOutput,
} from "../commands/DescribeFlowLogsCommand";
import { EC2Client } from "../EC2Client";
import { EC2PaginationConfiguration } from "./Interfaces";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: EC2Client,
  input: DescribeFlowLogsCommandInput,
  ...args: any
): Promise<DescribeFlowLogsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeFlowLogsCommand(input), ...args);
};
export async function* paginateDescribeFlowLogs(
  config: EC2PaginationConfiguration,
  input: DescribeFlowLogsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeFlowLogsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeFlowLogsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof EC2Client) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected EC2 | EC2Client");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
