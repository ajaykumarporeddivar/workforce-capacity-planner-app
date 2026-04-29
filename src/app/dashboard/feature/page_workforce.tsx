'use client'
import { useParams } from 'next/navigation'
import type { Workforce } from 'lib/data'
import { Card, CardHeader, CardTitle, CardContent, Box, Button } from 'lib/components/ui'
import { MOCK_WORKFORCE } from 'lib/mock-data'

function PageWorkforce() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''

  if (!slug) {
    return (
      <div>
        <p>No Workforce feature found.</p>
      </div>
    )
  }

  const selectedFeature = MOCK_WORKFORCE.find(
    (workforce) => workforce.slug === slug
  ) as Workforce
  const MOCK_DATA = selectedFeature.contentMockDataList

  return (
    <div>
      <h1>{selectedFeature.name}</h1>
      <p>{selectedFeature.subtitle}</p>

      <Card>
        <CardHeader>
          <CardTitle>Search Filter</CardTitle>
          <Button>Apply Filter</Button>
        </CardHeader>
        <CardContent>
          <select>
            <option value="status_filter">Status Filter</option>
          </select>
          <input type="text" placeholder="Search" />
          <Button>Search</Button>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6' }}>
        {MOCK_DATA.slice(0, 10).map((workforce) => (
          <Card
            key={workforce.id}
            sx={{
              padding: '6',
              borderRadius: 'lg',
              backgroundColor: 'white',
              border: 'border-zinc-200',
              shadow: 'sm',
            }}
          >
            <CardHeader>
              <CardTitle>{workforce.name}</CardTitle>
              <Button
                onClick={() => alert('Entity detail modally opened')}
                sx={{
                  color: 'emerald.600',
                  typography: 'sm',
                }}
              >
                Details
              </Button>
            </CardHeader>
            <CardContent>
              <p>{workforce.status}</p>
              <Badge sx={{ color: 'amber.600' }}>{workforce.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  )
}

export default PageWorkforce