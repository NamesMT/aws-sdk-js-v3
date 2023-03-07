// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListGroundStationsCommand,
  ListGroundStationsCommandInput,
  ListGroundStationsCommandOutput,
} from "../commands/ListGroundStationsCommand";
import { GroundStationClient } from "../GroundStationClient";
import { GroundStationPaginationConfiguration } from "./Interfaces";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: GroundStationClient,
  input: ListGroundStationsCommandInput,
  ...args: any
): Promise<ListGroundStationsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListGroundStationsCommand(input), ...args);
};
export async function* paginateListGroundStations(
  config: GroundStationPaginationConfiguration,
  input: ListGroundStationsCommandInput,
  ...additionalArguments: any
): Paginator<ListGroundStationsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListGroundStationsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof GroundStationClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected GroundStation | GroundStationClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
