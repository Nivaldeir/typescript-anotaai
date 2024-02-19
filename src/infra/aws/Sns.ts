import {
  SNS
} from '@aws-sdk/client-sns'
import {
  SQS,
  ReceiveMessageCommand
} from '@aws-sdk/client-sqs'
export class Sns {
  private snsInstace: SNS
  private sqsInstace: SQS
  constructor() {
    this.snsInstace = new SNS({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    })
    this.sqsInstace = new SQS({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    })
  }
  async publish(input: Input) {
    if (!input.message) throw new Error()
    try {
      await this.snsInstace.publish({
        Message: input.message,
        TopicArn: process.env.AWS_SNS_TOPIC,
      })
      // console.log("message publish", data.MessageId);
    } catch (error) {
      console.log(error);
    }
  }
}

type Input = {
  message: string
}