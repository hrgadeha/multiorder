# -*- coding: utf-8 -*-
from setuptools import setup, find_packages
import re, ast

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in multiorder/__init__.py
_version_re = re.compile(r'__version__\s+=\s+(.*)')

with open('multiorder/__init__.py', 'rb') as f:
	version = str(ast.literal_eval(_version_re.search(
		f.read().decode('utf-8')).group(1)))

setup(
	name='multiorder',
	version=version,
	description='To Create Multiple Sales Order Using one single multiorder document',
	author='Hardik',
	author_email='hardikgadesha@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
