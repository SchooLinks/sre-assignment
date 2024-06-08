import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { SchoolappCdkStack } from '../lib/schoolapp-cdk-stack';

describe("SchoolappCdkStack", () => {
    let template: Template
    beforeEach(() => {
        const app = new cdk.App()
        const stack = new SchoolappCdkStack(app, 'school-app-cdk', {})
        template = Template.fromStack(stack)
    })
    test('creates 1 ec2 instance', () => {
        template.resourceCountIs("AWS::EC2::Instance", 1)
    })
    test('creates a VPC', () => {
        template.resourceCountIs("AWS::EC2::VPC", 1)
    })
    test('creates a security group', () => {
        template.resourceCountIs("AWS::EC2::SecurityGroup", 1)
        template.hasResourceProperties('AWS::EC2::SecurityGroup', {
            GroupDescription: 'school-app-cdk/schoolapp-sg',
            SecurityGroupEgress: [
              {
                CidrIp: '0.0.0.0/0',
                Description: 'Allow all outbound traffic by default',
                IpProtocol: "-1"
              }
            ],
            SecurityGroupIngress: [
                {
                    CidrIp: '0.0.0.0/0',
                    Description: "Allow HTTP traffic from anywhere",
                    FromPort: 80,
                    IpProtocol: "tcp",
                    ToPort: 80
                },
                {
                    CidrIp: '0.0.0.0/0',
                    Description: "Allow SSH traffic from anywhere",
                    FromPort: 22,
                    IpProtocol: "tcp",
                    ToPort: 22
                }
            ],
            VpcId: Match.anyValue()
          })
    })
    test('instance configured with properties', () => {
        template.hasResourceProperties('AWS::EC2::Instance', {
            InstanceType: 't2.micro',
            SecurityGroupIds: Match.arrayWith([
                {
                    'Fn::GetAtt': Match.arrayWith([
                        Match.stringLikeRegexp('schoolappsg')
                    ])
                }
            ]),
            UserData: Match.anyValue(),
            KeyName: { 'Ref': Match.stringLikeRegexp('schoolappkeypair') }
        })
    })
})
