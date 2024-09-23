import {
  IAfterGuiAttachedParams,
  IDoesFilterPassParams,
} from "ag-grid-community";
import { CustomFloatingFilterProps, useGridFilter } from "ag-grid-react";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

interface FloatingElectricFilterProps extends CustomFloatingFilterProps {
  model: boolean | null;
  onModelChange: (model: boolean | null) => void;
}

const FloatingElectricFilter: React.FC<FloatingElectricFilterProps> = ({
  model,
  onModelChange,
}) => {
  const [closeFilter, setCloseFilter] = useState<(() => void) | undefined>();
  const [unappliedModel, setUnappliedModel] = useState<boolean | null>(model);

  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      if (params.data && "electric" in params.data) {
        return (
          unappliedModel == null || params.data.electric === unappliedModel
        );
      }
      return false;
    },
    [unappliedModel]
  );

  const afterGuiAttached = useCallback(
    ({ hidePopup }: IAfterGuiAttachedParams) => {
      setCloseFilter(() => hidePopup);
    },
    []
  );

  useGridFilter({
    doesFilterPass,
    afterGuiAttached,
  });

  useEffect(() => {
    setUnappliedModel(model);
  }, [model]);

  const onElectricFieldChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUnappliedModel(value === "All" ? null : value === "true");
  };

  const onClick = () => {
    onModelChange(unappliedModel);
    if (closeFilter) {
      closeFilter();
    }
  };

  return (
    <div className="electric-field-filter">
      <div>Select Electric Field</div>
      <label>
        <input
          type="radio"
          name="electric"
          value="All"
          checked={unappliedModel == null}
          onChange={onElectricFieldChange}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          name="electric"
          value="true"
          checked={unappliedModel === true}
          onChange={onElectricFieldChange}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          name="electric"
          value="false"
          checked={unappliedModel === false}
          onChange={onElectricFieldChange}
        />
        False
      </label>
      <button onClick={onClick}>Apply</button>
    </div>
  );
};

export default FloatingElectricFilter;
