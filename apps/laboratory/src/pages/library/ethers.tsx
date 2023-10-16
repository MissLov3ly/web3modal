import { Center, Text, VStack } from '@chakra-ui/react'
import { NetworksButton } from '../../components/NetworksButton'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers-5/react'
import { EthersConnectButton } from '../../components/EthersConnectButton'
import { useEffect, useState } from 'react'

async function initializeWeb3Modal() {
  const projectId = process.env['NEXT_PUBLIC_PROJECT_ID']
  if (!projectId) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
  }
  const chains = [1, 42161, 137, 43114, 56, 10, 100, 324, 7777777, 8453, 42220, 1313161554]

  const ethersConfig = await defaultConfig({
    projectId,
    optionalChains: [1, 42161, 137, 43114, 56, 10, 100, 324, 7777777, 8453, 42220, 1313161554]
  })

  createWeb3Modal({ ethersConfig, chains, projectId, enableAnalytics: true })
}

export default function Ethers() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initializeWeb3Modal()
    setReady(true)
  }, [])

  return ready ? (
    <>
      <Center paddingTop={10}>
        <Text fontSize="xl" fontWeight={700}>
          V3 with Ethers
        </Text>
      </Center>
      <Center h="65vh">
        <VStack gap={4}>
          <EthersConnectButton />
          <NetworksButton />
        </VStack>
      </Center>
    </>
  ) : null
}
