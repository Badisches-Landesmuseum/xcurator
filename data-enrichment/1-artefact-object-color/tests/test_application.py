import json
from typing import List

import pytest
from fastkafka._application.tester import Tester

from src.application import kafka_app
from src.models.image_input import ImageInput
from py_config import resources_dir

test_application = kafka_app
@pytest.fixture(scope='session')
def image_inputs() -> List[ImageInput]:
    json_messages = resources_dir('test_messages.json', in_test_dir=True).read_text()
    messages = json.loads(json_messages)
    return [ImageInput(data=message['data']) for message in messages]


@pytest.fixture
async def kafka_tester() -> Tester:
    async with Tester(kafka_app) as test_kafka:
        return test_kafka


@pytest.mark.asyncio
@pytest.mark.skip(reason="currently no way to use topic names including [.,-] e.g. image.color-info")
async def test_application(image_inputs):
    async with Tester(kafka_app) as test_kafka:
        for msg in image_inputs:
            await test_kafka.to_input_data(msg)
    #
    #     # Assert that the kafka_app responded with IrisPrediction in predictions topic
    #     await kafka_tester.awaited_mocks.on_predictions.assert_awaited_with(
    #         ColorInfoOutput(), timeout=2
    #     )