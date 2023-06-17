
import renderer from 'react-test-renderer'
import Loading from '../../components/Loading'

test('Display loading spinner', () => {
  const component = renderer.create(
    <Loading />
  )

  expect(component).toBeDefined();
})