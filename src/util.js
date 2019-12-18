const CERTS = [
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIUM6Jsa38cHa+8gMqP9gA7JQoJRGUwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNDgyOVoXDTIwMTIxMTEwNDgy
OVowbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAL/I0L6u
EJuGgC31QKsfd4vV0ehN4bavOKNCvP0J08vunGhSYBe31qIRdNOOy0y86ZFIEOHe
Xzvt6Xv5RegqqKkCAwEAAaNTMFEwHQYDVR0OBBYEFKnEbs634rzsWZuJ3z+Bus/O
mB4WMB8GA1UdIwQYMBaAFKnEbs634rzsWZuJ3z+Bus/OmB4WMA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQBm0y9Vja7SSo7JTUMqe7GgdthM3Sja0880
67dt2/5JAlA6xd6augFSQOy9FbF37SuRFK6gfAuuwaX1jRLANVq2
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAv8jQvq4Qm4aALfVA
qx93i9XR6E3htq84o0K8/QnTy+6caFJgF7fWohF0047LTLzpkUgQ4d5fO+3pe/lF
6CqoqQIDAQABAkABMyZrKveboXnHz9L5vxamX04S3/nbhLkb/FzmUFts2SyAfM3g
b3p56fUpbhd/fndECZYxn98KMOKrp8zS/QiJAiEA/zJV4Kqf0ZnxjTgaJmiSE2ZQ
67kYzwt3gETmQKb9ltcCIQDAY2AsO4uWRQtApykjRtfxU6SUyxKSpeUDuecDg3NM
fwIhAIlysPJas82Onp0zFFKPi+3K89aiUQxi3rBFa8Zyqq7tAiBTgs+cY7yT3iSk
S+tvhLD38Hbgn8XQInLmyyucOtMxwQIgML0cgP1M43gfz18WQ/EgvF9HDVgKsJC1
r/WkremnIVU=
-----END PRIVATE KEY-----`
  },
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIUcQyG7JwxlmY9XkqDcP0WNnZYKaAwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNTAwNVoXDTIwMTIxMTEwNTAw
NVowbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ/5sodu
BU9+j7p74xhjxfTTfQ27mDutsr0SNi2abvNrFdVr7PQJR5yXXcnn1F5NURU9UlMr
9p/6VSQdiJrBQPUCAwEAAaNTMFEwHQYDVR0OBBYEFHf2bRi0JN9mBFF7qq4RR7Ls
06diMB8GA1UdIwQYMBaAFHf2bRi0JN9mBFF7qq4RR7Ls06diMA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQB/W01ksFq2bZqrnNGICUz38IxG8kKM2TwT
g1kygvZM3fCV0xKyN+gGCPp8/ks906Msx1QjZ404uYNNrwQX/EPf
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAn/myh24FT36Punvj
GGPF9NN9DbuYO62yvRI2LZpu82sV1Wvs9AlHnJddyefUXk1RFT1SUyv2n/pVJB2I
msFA9QIDAQABAkBIf/xF3jmv5jazGBQ6aHU9WF9zStJaMYUwpMFC95tS2zyt0/Mx
meuDsEf7J1sE0ILfY+TiZ9IGcBGvm746MhBdAiEAzW1JgFPDj7vIKG0/QMB+/Wlc
wRIzXIJg/TQfhxW9cNsCIQDHW+X6N9lqosu2Pd4gYDDqmFkYsaTy1v99MU4bHoeW
bwIgTyS4uaEL6fddwP197hN7mWQbYSMC+LQea87GCsQ8bRsCIQC6CQr6TcXI2fQp
s2AmbD0ZnmN+RL/9kR5H0IvniLzUZwIgaC5wc0rpqO1w51O1mAavA0wAWMLhzgHv
6ozDEi3E83U=
-----END PRIVATE KEY-----`
  },
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIUWj9V9scUepqHugRpa2VwDNJHhzIwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNTA1M1oXDTIwMTIxMTEwNTA1
M1owbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMnOXmBd
9aJWc/Yyc144Su6YIaegEx8X70Nn8mYR7w0bjYC1XPl/+7Ghc+quSizvnfDA+sTs
2s0oAs/a73sAOv8CAwEAAaNTMFEwHQYDVR0OBBYEFC8ID5rlWNnlvAGItMEZpbyK
QlX2MB8GA1UdIwQYMBaAFC8ID5rlWNnlvAGItMEZpbyKQlX2MA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQCx07pzaaXTYum5vv8XSZbE8ZQMnq/esd+g
/ftqsIPASzq0hlwXHcVZnzpDYdp5D7EXCkLds3NmNC1O0/F7t6ap
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAyc5eYF31olZz9jJz
XjhK7pghp6ATHxfvQ2fyZhHvDRuNgLVc+X/7saFz6q5KLO+d8MD6xOzazSgCz9rv
ewA6/wIDAQABAkBNgIzsM4mPU+ZrCcsWx0W3xgM+zhIp4dZIq9YC7yZAgMLMqgHy
ZaHFxFnmysT7RR/QDbGAfV4oMX2x1yeby/KZAiEA5AuxgUjpsk+pZbuIUHgs/xc8
tmzOaN/PM609fk6t5EsCIQDii0BZuktx5p79PMf5n9OldYxtx62uGDEXcG/MlSQL
nQIhANd81Ta9l1cPP5sKIj0n0h0Z8BzRpBolor3KLhl0b40RAiEAvrmrwJ8F+2vE
uMDePzuezPMs+hOdFjAJzIj9psh9I0UCIQCpXU1o2XY62ndgOeACdV1QoSR3Naej
NzAKmRegbxWPEQ==
-----END PRIVATE KEY-----`
  },
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIUJ2PdpCc1DUfa3fgNG6JRu8WWxPcwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNTEyN1oXDTIwMTIxMTEwNTEy
N1owbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMS+W6v4
oWGsgIB/icxw4TBebQadWaPQLOiyhTRrDQvcAsLTdbaSVEPAef/VCiIBEmZx6buy
fk9adHD1PK8/utMCAwEAAaNTMFEwHQYDVR0OBBYEFJGUOmo7zfmAZQjdPavh/hGN
yhRNMB8GA1UdIwQYMBaAFJGUOmo7zfmAZQjdPavh/hGNyhRNMA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQBDp4/RSijgUughMmHh28HB9zsj04/x9FZ/
O7iWToRod3w9ZrPPg42WLzdV0F3LcDhdnTFhobcGDtqievEtwlc4
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAxL5bq/ihYayAgH+J
zHDhMF5tBp1Zo9As6LKFNGsNC9wCwtN1tpJUQ8B5/9UKIgESZnHpu7J+T1p0cPU8
rz+60wIDAQABAkEAvv0b+MGPyEWxKQymNHSP5miD5hvx3PhF4E8MyGnzbEIfdXPO
TCxufN2fxFvtBF1TIQbMXAuqLnqxzwUz/m5TwQIhAO1C1uGFgp5k6hZjM5bn2REk
+XdwE2FVWVTZjznT6e4ZAiEA1EhMhszbALnI9n30KOFtlox78yEEN3H2DGooZrsy
9csCIQCKDwWorx6leoU4R7tCSWDm+APtuxqb3aUgmYQdGzGZKQIgJKaS59conJh2
9O/MHt7E3/BDWjfCFZyMYZpWfV4mrz8CIQDHox16lO1wqjVDsRcstxsgwagXFUQu
yt0yTM03th3j4g==
-----END PRIVATE KEY-----`
  },
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIULp3O5+a3uwR/PTlgnX4hUJgJ0UYwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNTE0OFoXDTIwMTIxMTEwNTE0
OFowbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANKluZBU
HT+sygaq9IqEPJ5zdxeT8++NlIWtBgtgGMR+bcIsuWLB02uatua6U3HbVCZxfzrH
6PbNoIUCLcamm1UCAwEAAaNTMFEwHQYDVR0OBBYEFBcRoBmuBNrWXBKYBljFsmAs
i+uAMB8GA1UdIwQYMBaAFBcRoBmuBNrWXBKYBljFsmAsi+uAMA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQAMDDBMgD2/tS0BkHHHaKULXnPd2bz2uOVt
3tFbJ89GaSsbGNZr048pIQE9oHVqWcdO9yqtdAOPmnY98yR64bIj
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0qW5kFQdP6zKBqr0
ioQ8nnN3F5Pz742Uha0GC2AYxH5twiy5YsHTa5q25rpTcdtUJnF/Osfo9s2ghQIt
xqabVQIDAQABAkAFcDnmPAW1SyS8H1XI7bkS7jA475zwplsbSGhLiuOYzw7QB9Hu
yhtqcEvuBsadS0jep9xXbqMJ2GAH2JednPmBAiEA7TtNtlU1dNYGTlS6SsOcz/Ky
1D2JXRsJRAzrbR1sAxkCIQDjUAE2GaV0SfkeYmKVro/kIrBLeXcPuCYetIPFK0H9
nQIgNUxRlVlnfSxolkiq4gk4ve+FBfIdXnGoj0Vnz0gA8GECIBCsQpp8QRWJg3tG
DiMafbVnEfVHQINnp2wjI3Mn3BxFAiAuoJugQ+FeKwWbiWLFm1rmz1ln9pMa8RHk
bOXwd/tqcQ==
-----END PRIVATE KEY-----`
  },
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIUdA/H9/YqQLgwyEDJZTL8cN3z4CMwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNTIxMFoXDTIwMTIxMTEwNTIx
MFowbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOPeeTRS
gbZ2VOgGISCXH8mc9Qmmx+KRJk2ecuQn+SKl3pNnBCrCk3HzOypTCb7kZs06NdlD
9zQFP2jdJmLQfQkCAwEAAaNTMFEwHQYDVR0OBBYEFNizmcbAmm1dPrs4z8eRKXJ3
eEA6MB8GA1UdIwQYMBaAFNizmcbAmm1dPrs4z8eRKXJ3eEA6MA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQCuQ0E4/f4ZPHCXbIX8Tnjmq/4DpEAssk0R
maQ6+Bbh3BX2g7qEdThwDf+JGanh2Qy5y2uqEUHu5ychv/KdwW5t
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA4955NFKBtnZU6AYh
IJcfyZz1CabH4pEmTZ5y5Cf5IqXek2cEKsKTcfM7KlMJvuRmzTo12UP3NAU/aN0m
YtB9CQIDAQABAkEAxSvILOIHo16Y8Xv8Rjr+InJSBVvvMbjvL9KfD5UXGkZSNk/T
HPgDiePycmdLKb25wX3Ujhl3lCvILY1L5muLEQIhAPkuwAVpDnFtmnAKDl02IYut
yGU20oeiyMbQ/I3O5Pa7AiEA6hpx+N3JcDcN7Qb64mBz9yInsra2Y7baSpOzDHQa
+QsCICB9UPojnYd6k/VhykerBCqzKPrRcBfRSL5rh1JyFHZ7AiAkqQWGGn1MJGL6
5mftgXtHjUK4OuKvFNh0a1LTtW7v5wIgZXZJESW2lvfdz+ktDrAzgjbF9/7jmop0
NtW+eSTB8Zc=
-----END PRIVATE KEY-----`
  },
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIUQRTiIKp6shr4JqraDTd1T/QlqEUwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNTI1NloXDTIwMTIxMTEwNTI1
NlowbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM3uVzcr
DZcQ43r90GcMmYfpeQDBAGrMgAAm1NuJsqJax3zLdUMVTn5XbrKCBr9KEkkG3JgO
KD1XZm1ui17oudMCAwEAAaNTMFEwHQYDVR0OBBYEFJzJjbJGHY6ycr4P4x2/I3lM
5RWzMB8GA1UdIwQYMBaAFJzJjbJGHY6ycr4P4x2/I3lM5RWzMA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQADb4zDR/VDCnu/PUw/XOS1qa2tySgu4tdS
MuHokfaON3rHgn/hkFJncokmbW/+Eci6bm7o8VLRwPMv73Vgn3HC
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAze5XNysNlxDjev3Q
ZwyZh+l5AMEAasyAACbU24myolrHfMt1QxVOfldusoIGv0oSSQbcmA4oPVdmbW6L
Xui50wIDAQABAkEAsnPP8GbGqBpihrpcVnB8u2J/EUAu9F2yrm74FicFPdqNNr9p
VlBMVfnpq/Npvd7NBmRNMRNH0XTNIKPzLSXggQIhAPyC9hjk23VLkedQKbP9RzUN
F+z73EzFFQijQMNu/bI5AiEA0MakNW6XKdblHseVIhrvqp3ViFeRWAplNUSsszJp
HGsCIH7pp50tcWvLtqJm9P7k3uQ4F31hvQDM0VyNCODxKQtpAiEAvLw2yo71XL+G
VbL7oN9U9prE5QK0xDBxmhxBO6ZA240CIQD1/6bdhaD5mIYX2iGgseYumuctlsX6
mMIpu75/ph7fYg==
-----END PRIVATE KEY-----`
  },
  {
    'cert': `-----BEGIN CERTIFICATE-----
MIICMzCCAd2gAwIBAgIUX9Z2cLLXPKYr4AhDidrB1lVvo2wwDQYJKoZIhvcNAQEL
BQAwbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMB4XDTE5MTIxMjEwNTMxM1oXDTIwMTIxMTEwNTMx
M1owbjELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQgSG9sbGFuZDERMA8GA1UE
BwwIRGVuIEhhYWcxDTALBgNVBAoMBElDVFUxEDAOBgNVBAsMB0Rpc2NpcGwxFDAS
BgNVBAMMC2V4YW1wbGUuY29tMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANa00Y5k
xDD2MVgMSYndjpLViKZWA7gQ+rXOJmyfRLclw8FArsHjmOflll0yGfuCK9Lp5pua
bWO5MqNzs9AFU0UCAwEAAaNTMFEwHQYDVR0OBBYEFO1tcNOIIxsn2eBrY/sq++H7
rjlCMB8GA1UdIwQYMBaAFO1tcNOIIxsn2eBrY/sq++H7rjlCMA8GA1UdEwEB/wQF
MAMBAf8wDQYJKoZIhvcNAQELBQADQQCZ6S+bMWcMvrG9O2oE1RkOIgxM1zkRWo4w
XM6uJA/KAbFVV6RUblkl1TbodAoLTjhk323V0UnuCrzKiDwCO7r9
-----END CERTIFICATE-----`,
    'privkey': `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEA1rTRjmTEMPYxWAxJ
id2OktWIplYDuBD6tc4mbJ9EtyXDwUCuweOY5+WWXTIZ+4Ir0unmm5ptY7kyo3Oz
0AVTRQIDAQABAkEAo2fejTbXskPM7iv70/dRSSNG6wFPt0kE5lVNHSJiE9g/C8qM
E+0QCDI+dLU3ycEx9wxoLfto7J5IGRMbe0kFAQIhAPGWRRum8Ut+EnZ5eCtXVxQw
vDkAp2oHxKuDOMJSmGjhAiEA44QA112KTrNHq6nvjeNivZZXRqz3bsXC12GfZ4vV
wuUCIQDfPYz+0HWI3ScSc4yoAD1nWuGTixco06TZGJkKeGh+AQIhAJzJO/cuXACO
JabT7eS+vS3fa/elfMIWgIYCnWIzCDVNAiAwS3pUt9ZS0L6Ic4G709zCA7pwxKVK
ejzvQU+uAf73Bg==
-----END PRIVATE KEY-----`
  }

]

class Util {
  constructor (lawReg) {
    this.lawReg = lawReg
    this.core = lawReg.getAbundanceService().getCoreAPI()
  }

  async setupModel (model, actors, factFunctionSpec, usePregenIdentities = true) {
    const ephemeralConnector = await this.core.getConnector('ephemeral')
    const allActors = actors.concat(['lawmaker'])
    const ssids = {}
    let identityIndex = 1
    for (let actor of allActors) {
      if (usePregenIdentities && CERTS[identityIndex]) {
        ssids[actor] = await ephemeralConnector.newIdentity(CERTS[identityIndex])
        identityIndex += 1
      } else {
        ssids[actor] = await ephemeralConnector.newIdentity({})
      }

      await this.core.allow(ssids[actor])
    }

    const factFunctions = Object.keys(factFunctionSpec).reduce((factFunctions, fact) => {
      if (allActors.includes(factFunctionSpec[fact])) {
        factFunctions[fact] = 'IS:' + ssids[factFunctionSpec[fact]].did
      } else {
        factFunctions[fact] = factFunctionSpec[fact]
      }
      return factFunctions
    }, {})

    let modelLink = await this.lawReg.publish(ssids['lawmaker'], { ...model, 'model': 'LB' }, factFunctions)

    return { 'ssids': ssids, 'modelLink': modelLink }
  }

  async scenarioTest (ssids, modelLink, acts, facts, usePregenIdentity = true) {
    const ephemeralConnector = await this.core.getConnector('ephemeral')
    const cert = usePregenIdentity ? CERTS[0] : {}

    let needSsid = await ephemeralConnector.newIdentity(cert)
    await this.core.allow(needSsid)

    let needLink = await this.core.claim(needSsid, {
      'need': {
        'DISCIPL_FLINT_MODEL_LINK': modelLink
      }
    })

    console.log('Starting case')
    let caseLink = needLink

    const factResolver = (fact) => {
      if (facts[fact]) {
        if (Array.isArray(facts[fact])) {
          return facts[fact].shift()
        } else {
          return facts[fact]
        }
      }
      return false
    }

    for (let act of acts) {
      caseLink = await this.lawReg.take(ssids[act.actor], caseLink, act.act, factResolver)
    }
  }
}

export default Util
