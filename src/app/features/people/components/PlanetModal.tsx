import React from 'react';

import { Planet } from '../../../shared/api/planetApi';
import Modal from '../../../shared/components/Modal';

type PlanetModalProps = {
  planet: Planet;
  onClose: () => void;
};

const PlanetModal = ({ planet, onClose }: PlanetModalProps) => (
  <Modal title={planet.name} onClose={onClose}>
    <p className="text-gray-300">
      <span className="font-semibold text-gray-100">Diameter:</span>{' '}
      {planet.diameter}
    </p>
    <p className="text-gray-300">
      <span className="font-semibold text-gray-100">Climate:</span>{' '}
      {planet.climate}
    </p>
    <p className="text-gray-300">
      <span className="font-semibold text-gray-100">Population:</span>{' '}
      {planet.population}
    </p>
  </Modal>
);

export default PlanetModal;
