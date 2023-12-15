# syntax=docker/dockerfile:1
# Keep this syntax directive! It's used to enable Docker BuildKit

# Based on https://github.com/python-poetry/poetry/discussions/1879?sort=top#discussioncomment-216865
# but I try to keep it updated (see history)

FROM python:3.10-bullseye as python-base

    # python
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    \
    # pip
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    \
    # poetry
    # https://python-poetry.org/docs/configuration/#using-environment-variables
    # https://github.com/python-poetry/poetry/releases
    POETRY_VERSION=1.5.0 \
    # make poetry install to this location
    POETRY_HOME="/opt/poetry" \
    # make poetry create the virtual environment in the project's root
    # it gets named `.venv`
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    # do not ask any interactive question
    POETRY_NO_INTERACTION=1 \
    \
    # paths
    # this is where our requirements + virtual environment will live
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"


# prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"


################################
# BUILDER-BASE
# Used to build deps + create our virtual environment
################################
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # deps for installing poetry
        curl \
        # deps for building python deps
        build-essential

# Pre-download the models. Upside: downloads with deps and exactly where required. Downside: versions specified need maintenance; 1+ Gb of download (but cached!).
# Alternative: https://github.com/bodaay/HuggingFaceModelDownloader
RUN pip install --no-cache-dir multilingual_clip==1.0.10 torch==2.0.1 &&\
    python -c 'from multilingual_clip import pt_multilingual_clip; pt_multilingual_clip.MultilingualCLIP.from_pretrained("M-CLIP/XLM-Roberta-Large-Vit-B-16Plus")'

# install poetry - respects $POETRY_VERSION & $POETRY_HOME
# The --mount will mount the buildx cache directory to where 
# Poetry and Pip store their cache so that they can re-use it
RUN --mount=type=cache,target=/root/.cache \
    curl -sSL https://install.python-poetry.org | python3 -

# copy project requirement files here to ensure they will be cached.
WORKDIR $PYSETUP_PATH
COPY poetry.lock pyproject.toml ./

# install runtime deps - uses $POETRY_VIRTUALENVS_IN_PROJECT internally
# Bug: --no-root (https://github.com/python-poetry/poetry/issues/1132)
RUN --mount=type=cache,target=/root/.cache \
    poetry install --no-root

################################
# PRODUCTION
# Final image used for runtime
################################
FROM python-base as production
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH
COPY --from=builder-base /root/.cache/huggingface/hub/ /root/.cache/huggingface/hub/
COPY /src /src
WORKDIR /src

# set python context explicit
ENV PYTHONPATH=/

EXPOSE 8080
CMD ["python", "./main.py"]