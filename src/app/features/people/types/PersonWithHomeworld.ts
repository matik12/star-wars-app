import { Person } from '../../../shared/api/personApi';

type PersonWithHomeworld = Person & { homeworld_name: string | null };

export default PersonWithHomeworld;
