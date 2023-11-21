from py_config  import root_dir, model_dir, resources_dir


def test_root():
    root = root_dir()
    assert root
    assert "src" not in root.parts
    assert "color-extractor-service" in root.parts


def test_resources():
    resource_dir = resources_dir()
    assert resource_dir
    assert "src" in resource_dir.parts

    test_resource_dir = resources_dir(in_test_dir=True)
    assert test_resource_dir
    assert "tests" in test_resource_dir.parts


def test_model():
    model = model_dir()
    assert model
    assert "model" in model.parts
