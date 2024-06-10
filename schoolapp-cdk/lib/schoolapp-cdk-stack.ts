import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { readFileSync } from 'fs'

export class SchoolappCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'schoolapp-vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
      subnetConfiguration: [
        { name: 'public', cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC },
      ],
    })

    const schoolappSG = new ec2.SecurityGroup(this, 'schoolapp-sg', {
      vpc,
      allowAllOutbound: true,
    });
    schoolappSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP traffic from anywhere'
    )
    schoolappSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH traffic from anywhere'
    )

    const keyPair = new ec2.KeyPair(this, 'schoolapp-keypair', {})
    const instance = new ec2.Instance(this, 'schoolapp-instance', {
      vpc: vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: schoolappSG,
      keyPair
    })
    const userDataScript = readFileSync('./lib/user-data.sh', 'utf8');
    instance.addUserData(userDataScript);

    new cdk.CfnOutput(this, 'InstanceIP', {
      value: instance.instancePublicIp
    })
    new cdk.CfnOutput(this, 'KeypairName', {
      value: keyPair.keyPairId
    })
  }
}
