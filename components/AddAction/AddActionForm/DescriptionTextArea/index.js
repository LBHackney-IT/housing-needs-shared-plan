const DescriptionTextArea = () => (
  <div class="govuk-form-group">
    <label class="govuk-label" for="full-description">
      Full description(optional)
    </label>
    <textarea
      class="govuk-textarea"
      id="full-description"
      name="full-description"
      rows="5"
    ></textarea>
  </div>
);

export default DescriptionTextArea;
