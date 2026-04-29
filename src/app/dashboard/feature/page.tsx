'use client'
import { useParams } from 'next/navigation'
import { Box, Text, Image } from 'next/auth' // Removed unused import
import type { FeatureItem } from 'lib/data'
import { FeatureCard, FeatureTitle, FeatureSubtitle } from 'lib/components/ui'
import { MOCK_FEATURES } from 'lib/mock-data'

function Page() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''

  if (!slug) {
    return (
      <Box
        sx={{
          display: 'grid',
          gap: '6',
          gridTemplateColumns: '1fr',
          md: 'grid-cols-3',
        }}
      >
        {MOCK_FEATURES.map(({ id, slug, name, description }) => (
          <FeatureCard
            key={id}
            href={`/dashboard/${slug}`}
            sx={{
              p: '6',
              bg: 'white',
              border: 'border-zinc-200',
              rounded: 'lg',
              shadow: 'sm',
            }}
          >
            <Image
              src={` ${slug}`}
              alt={name}
              sx={{
                height: '10',
                mr: '4',
                w: '10',
              }}
            />
            <FeatureTitle sx={{ fontSize: 'xl' }}>{name}</FeatureTitle>
            <FeatureSubtitle
              sx={{
                color: 'text.zinc.400',
                typography: 'sm',
              }}
            >
              {description}
            </FeatureSubtitle>
            <Box
              as="a"
              href={`/dashboard/${slug}`}
              sx={{
                cursor: 'pointer',
                color: 'emerald.500',
                typography: 'sm',
              }}
            >
              Open
            </Box>
          </FeatureCard>
        ))}
      </Box>
    )
  }

  const selectedFeature = MOCK_FEATURES.find(
    (feature) => feature.slug === slug
  ) as FeatureItem
  const MOCK_DATA =
    selectedFeature.type === 'dashboard'
      ? selectedFeature.contentMockData
      : selectedFeature.contentMockDataList

  return (
    <Box
      sx={{
        padding: '6',
        backgroundColor: 'zinc.50',
      }}
    >
      <FeatureCard
        sx={{
          padding: '4',
          marginBottom: '6',
        }}
      >
        <FeatureTitle> {selectedFeature.name}</FeatureTitle>
        <FeatureSubtitle>{selectedFeature.subtitle}</FeatureSubtitle>
        <Box
          as="a"
          href={`/dashboard/${slug}`}
          sx={{
            cursor: 'pointer',
            color: 'zinc.600',
            typography: 'sm',
          }}
        >
          {selectedFeature.viewMoreLink}
        </Box>
      </FeatureCard>
      <Box
        sx={{
          marginBlock: '6',
        }}
      >
        {selectedFeature.type === 'dashboard' ? (
          < MOCK_DATA.map((item) => (
            < MOCK_DATA.card key={item.id} item={item} />
          ))}
        ) : (
          < MOCK_DATA.map((item) => (
            < MOCK_DATA.itemCard key={item.id} item={item} />
          ))
        )}
      </Box>
    </Box>
  )
}

export default Page