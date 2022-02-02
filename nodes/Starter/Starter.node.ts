import { IExecuteFunctions } from "n8n-core";
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from "n8n-workflow";

export class Starter implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Starter",
		name: "tweetNaCl",
		group: ["transform"],
		version: 1,
		description: "Starter Node",
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: "Starter",
			color: "#772244",
			description: "Use this node as an example",
		},
		inputs: ["main"],
		outputs: ["main"],
		properties: [
			/* ---------------------------------- Resources ---------------------------------- */
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				default: "print",
				description: "The resource to perform",
				options: [
					{
						name: "Print",
						value: "print",
						description: "Print Resource",
					},
				],
			},
			/* ---------------------------------- Operations ---------------------------------- */
			{
				displayName: "Operation",
				name: "operation",
				type: "options",
				required: true,
				default: "defaultMessage",
				displayOptions: {
					show: {
						resource: ["print"],
					},
				},
				options: [
					{
						name: "Default Message",
						value: "defaultMessage",
						description: "Default Message",
					},
					{
						name: "Print Message",
						value: "printMessage",
						description: "Print Message",
					},
				],
			},
			/* ---------------------------------- Fields ---------------------------------- */
			{
				displayName: "Message",
				name: "message",
				type: "string",
				default: "Hello World",
				displayOptions: {
					show: {
						operation: ["printMessage"],
						resource: ["print"],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter("resource", 0) as string;
		const operation = this.getNodeParameter("operation", 0) as string;
		for (let i = 0; i < items.length; i++) {
			if (resource === "print") {
				if (operation === "defaultMessage") {
					try {
						returnData.push({ message: "You did it!" });
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({ error: "Failed to execute node." });
							continue;
						}
						throw error;
					}
				}
				if (operation === "printMessage") {
					const message = this.getNodeParameter("message", i) as string;
					try {
						returnData.push({ message: message });
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({ error: "Failed to execute node." });
							continue;
						}
						throw error;
					}
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
